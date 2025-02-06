import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { ButtonComponent } from "../../button/button.component";
import { isPlatformBrowser } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { KanbanService } from '../../../../core/services/kanban/kanban.service';

@Component({
  selector: 'app-modal-choose-project',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal-choose-project.component.html',
  styleUrl: './modal-choose-project.component.css',
})
export class ModalChooseProjectComponent {
  @Output() closeModal = new EventEmitter<void>();
  clickOutsideListener: () => void = () => {};
  @ViewChild('modal', { static: false }) modal!: ElementRef<HTMLDivElement>;

  isBrowser: boolean;
  decodedToken: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    private tokenService: TokenService,
    private kanbanService: KanbanService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  close(): void {
    this.closeModal.emit(); // Emite o evento para fechar o modal
  }

  ngOnInit(): void{
    const token = this.tokenService.getToken();
    this.decodedToken = this.tokenService.decodeToken();
    if (token && this.decodedToken) {
        this.kanbanService.getAllProjectsInfos(token, String(this.decodedToken.id)).subscribe((response) => {
            console.log(response);
        });
    } else {
      console.log('Nenhum token encontrado no localStorage');
    }
  }

  ngAfterViewInit(): void {
    // Adiciona um ouvinte de clique para detectar cliques fora do modal
    if (this.isBrowser) {
      this.clickOutsideListener = this.renderer.listen(
        'document',
        'click',
        (event: Event) => {
          const clickedInside = this.modal.nativeElement.contains(
            event.target as Node
          );
          if (!clickedInside) {
            this.close(); // Fechar o modal
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    // Remover o ouvinte de clique quando o componente for destruído
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
    }
  }
}
