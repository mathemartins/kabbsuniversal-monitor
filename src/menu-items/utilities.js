// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-fcm-pn',
      title: 'Send Cloud Notifier',
      type: 'item',
      url: '#',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-trips',
      title: 'Trips',
      type: 'item',
      url: 'trips',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-drivers',
      title: 'Drivers',
      type: 'item',
      url: 'drivers',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'util-reg-drivers',
      title: 'Register Driver',
      type: 'item',
      url: 'register-drivers',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
