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
      url: '/utils/util-cloud-notify',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-trips',
      title: 'Trips',
      type: 'item',
      url: '/utils/util-trips',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-drivers',
      title: 'Drivers',
      type: 'item',
      url: '/utils/util-drivers',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
  ]
};

export default utilities;
