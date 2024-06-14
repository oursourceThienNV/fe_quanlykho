import {Directive, ElementRef, OnInit} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonService} from "../../core/services/common.service";

@Directive({
  selector: '[ngxDropdownMenu]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.dropdown-menu]': 'true',
    '[class.show]': 'dropdown.isOpen'
  }
})
export class DropdownMenuDirective {
    constructor(
        public dropdown: DropdownDirective
    ) { }
}
