import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Output,
  PLATFORM_ID,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { KanbanService } from '../../../../core/services/kanban/kanban.service';
import { TokenService } from '../../../../core/services/token/token.service';
import { ButtonComponent } from '../../button/button.component';
// Removed incorrect import

@Component({
  selector: 'app-modal-colors-project',
  standalone: true,
  imports: [ColorPickerModule, CommonModule, ButtonComponent],
  templateUrl: './modal-colors-project.component.html',
  styleUrl: './modal-colors-project.component.css',
})
export class ModalColorsProjectComponent {
  @Output() closeModal = new EventEmitter<void>();

  color1: string = '#000000';
  color2: string = '#000000';
  isPickerOpen: boolean = true;
  isBrowser: boolean;
  clickOutsideListener: () => void = () => {};

  @ViewChild('modal', { static: false }) modal!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2,
    private KanbanService: KanbanService,
    private tokenService: TokenService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    const projectId = this.KanbanService.getProjectIdInLocalStorage();

    if (token && projectId) {
      this.KanbanService.getProjectColors(token, projectId).subscribe((response) => {
        
        if(response){
            this.color1 = response.colorLogo1;
            this.color2 = response.colorLogo2;
        }
      });
    }
  }

  close(): void {
    this.closeModal.emit(); // Emite o evento para fechar o modal
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

  onSubmitted(): void {
    const token = this.tokenService.getToken();
    const projectId = this.KanbanService.getProjectIdInLocalStorage();

    if (token && projectId) {
      this.KanbanService.updateProjectColors(
        token,
        projectId,
        this.color1,
        this.color2
      ).subscribe(() => {
        this.closeModal.emit();
      });
    }
  }
}
