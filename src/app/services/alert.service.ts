import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  showAlert(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info'
  ) {
    let iconClass = this.getIconClass(icon);

    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      customClass: {
        icon: iconClass,
      },
      confirmButtonText: 'OK',
    });
  }

  async showConfirmAlert(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info'
  ): Promise<boolean> {
    let iconClass = this.getIconClass(icon);

    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      customClass: {
        icon: iconClass,
      },
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });
    return result.isConfirmed;
  }

  private getIconClass(icon: string) {
    let iconClass = '';
    switch (icon) {
      case 'warning':
        iconClass = 'warning-icon';
        break;
      case 'info':
        iconClass = 'info-icon';
        break;
    }
    return iconClass;
  }
}
