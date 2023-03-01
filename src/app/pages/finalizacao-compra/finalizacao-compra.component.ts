import { MatStepper } from '@angular/material/stepper';
import { MercadoPagoService } from './../../services/mercado-pago.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SorteiosService } from './../../services/sorteios.service';
import { RifasService } from './../../services/rifas.service';
import { LoginsService } from './../../services/logins.service';
import { Sorteios } from './../../interfaces/sorteios';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import QRCode from 'qrcode-generator';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-finalizacao-compra',
  templateUrl: './finalizacao-compra.component.html',
  styleUrls: ['./finalizacao-compra.component.scss'],
})
export class FinalizacaoCompraComponent implements OnInit {
  codigo: string = '';
  titulo: string = '';
  valor: number = 0;
  counter: number = 0;
  sorteioAtual!: Sorteios;
  idUser: number | undefined = 0;
  codigoPix: string = ""
  site: string = "";
  qrCodeImage: string = ""
  dataCriada = ""
  dataExpiracao = ""
  idPagamento: number = 0
  validacaoStepper: number = 1;
  finish: any = false;
  checked: boolean = true;
  carregando: boolean = false;

  @Input()
  stepper!: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private service: SorteiosService,
    private loginsService: LoginsService,
    private rifaService: RifasService,
    private _snackBar: MatSnackBar,
    private mercadoService: MercadoPagoService,
    private route: Router,
    private clipboardService: ClipboardService
  ) {}
  ngOnInit(): void {
    this.validacaoStepper = 1
    this.actRoute.params.subscribe((res: any) => {
      this.codigo = res.codigo;
    })
    this.titulo = this.codigo.split(':')[0];
    this.valor = parseFloat(atob(this.codigo.split(':')[1]).split(':')[1]);
    this.counter = parseFloat(atob(this.codigo.split(':')[1]).split(':')[0]);
    this.service.getByTitulo(this.titulo).subscribe((res) => {
      this.sorteioAtual = res;
    });
  }

  firstFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    // confirmTelefone: ['', Validators.required],
    email: ['', Validators.email],
  });
  isEditable = false;

  validacao() {
    this.carregando = true
    if(this.firstFormGroup.invalid){
      return
    }
    this.loginsService
      .getNumber(this.firstFormGroup.value.telefone!.replace(/\D/g, ''))
      .subscribe((res) => {
        var logins = res;
        if (logins.length == 0) {
          var login = {
            nome: this.firstFormGroup.value.nome!,
            telefone: this.firstFormGroup.value.telefone!.replace(/\D/g, ''),
            email: this.firstFormGroup.value.email!,
          };
          this.loginsService.postLogin(login).subscribe((res) => {
            this.idUser = res.id;
          });
        } else {
          res.map((result) => {
            this.idUser = result.id;
          });
        }
      });
      const paymentData = {
      payment_method_id : "pix",
      transaction_amount : this.valor,
      additional_info: {
        items: [
          {
          id: "1",
          title: `${this.titulo}`,
          description: `${this.counter} rifas no valor de ${this.valor / this.counter} do sorteio ${this.titulo}`,
          picture_url: this.sorteioAtual.imagem,
          category_id: "rifa",
          quantity: this.counter,
          unit_price: this.valor / this.counter
          }
        ]
      },
      payer: {
        email: `${this.firstFormGroup.value.email}`,
        first_name: `${this.firstFormGroup.value.nome?.split(' ')[0]}`,
        last_name: `${this.firstFormGroup.value.nome?.split(' ')[1]}`
      },
      statement_descriptor: "Ações Fuller™",
      description: `${this.counter} rifas no valor de ${this.valor / this.counter} do sorteio ${this.titulo}`,

    };

    this.mercadoService.createPayment(paymentData).subscribe(res => {
      this.codigoPix = res.point_of_interaction.transaction_data.qr_code
      this.dataCriada = res.date_created
      this.dataExpiracao = res.date_of_expiration
      this.idPagamento = res.id
      this.qrCodeImage = res.point_of_interaction.transaction_data.qr_code_base64
      this.carregando = false;
    }, error => {
      this._snackBar.open('Ocorreu um erro', 'Ok', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });

    var interval = setInterval(() => {
      this.mercadoService.getPayment(this.idPagamento).subscribe((res: any) => {
        if(res.status == "approved" ){
          this.finish = true
          this.validacaoStepper = 3
          this.checkup()
          clearInterval(interval);
        }
      })
    }, 5000)
    this.validacaoStepper = 2
  }

  checkup() {
    console.log("checkup");
    var rifas: any = [];
    this.rifaService.getRifas().subscribe((res) => {
      rifas = res;
    });
    const conjuntoNumeros = [];

    while (conjuntoNumeros.length < this.counter) {
      const novoNumero = Math.floor(
        Math.random() * this.sorteioAtual.count_rifas
      );
      const numeroSorteado = novoNumero.toString().padStart(5, '0');

      if (!rifas.some((rifa: any) => rifa.numeroRifas === numeroSorteado)) {
        conjuntoNumeros.push(numeroSorteado);
      }
    }

    var rifa = {
      pessoaID: this.idUser,
      numeroRifas: conjuntoNumeros.toString(),
      sorteioID: this.sorteioAtual.id,
    };
    this.rifaService.postRifas(rifa).subscribe((res) => {
      if (res.id! > 0) {
        this._snackBar.open('Compra Efetuada com successo', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        this._snackBar.open('Erro na compra', 'Ok', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  copyText() {
    this.clipboardService.copy(this.codigoPix);
  }

  teste(){
    this.checked = !this.checked
  }
}
