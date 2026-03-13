import { NavbarColorName } from '../model/themes/light-navbar';
import { SidebarColorName } from '../model/themes/light-sidebar';
import { PaletteMode } from './base';


/**
 * КОНФИГУРАТОР ОРГАНИЗАЦИИ ТЕМ И ЦВЕТОВ
 */
export interface UIConfiguratorProviderState {
  // ОБЩИЕ
  mode                   : PaletteMode
  isOpenConfigurator     : boolean         // Open / close Configurator

  // HEADER
  navbarFixed            : boolean         // 'fixed' | 'sticky'
  navbarTransparent      : boolean         // Прозрачный (вроде бы)
  navbarColor            : NavbarColorName // Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...
  //     - Active theme color: Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...

  // SIDEBAR
  isSidebar              : boolean          // Отображён или нет
  isMobileOpenSidebar    : boolean          // For mobile
  sidebarWidth           : number           // Текущая ширина (0 | 96 | 250)
  sidebarMini            : boolean
  sidebarColor           : SidebarColorName // Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...
  leftOffsetScrollButton : number           // Отступ левой кнопки скролл-влево в ScrollableWorkspace
  //     - Active theme color : Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...
  //     - Background image   : Без фона | С фоном
  //                                       |- : Загрузить свою | Картинка 1 | Картинка 2 | Картинка 3 ...

  // LAYOUT
  //     - Background theme   : Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...
  //     - Active theme color : Фиолетовый | Синий | Красный | Оранжевый | Зелёный ...
  //     - Background image   : Без фона | С фоном
  //                                       |- : Загрузить свою | Картинка 1 | Картинка 2 | Картинка 3 ...
}
