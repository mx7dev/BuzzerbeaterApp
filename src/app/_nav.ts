import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Principal',
    url: '/principal',
    icon: 'icon-cursor'
  },{
    name: 'Configuración',
    url: '/configuration',
    icon: 'icon-cursor'
  },
  {
    divider: true
  },
  {
    name: 'Cerrar Sesión',
    url: '/logout',
    icon: 'cil-account-logout'    
  }
];
