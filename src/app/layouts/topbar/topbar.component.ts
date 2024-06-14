import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;

  constructor(@Inject(DOCUMENT) private document: any, private router: Router,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService) {
  }

  listLang = [
    {text: 'Việt Nam', flag: 'assets/images/flags/vietnam.png', lang: 'vi'},
    {text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en'},
    // { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    // { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    // { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    // { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;
  fullname = '';

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    if(localStorage.getItem("authData")===""||localStorage.getItem("authData")===null||localStorage.getItem("authData")==="null"||localStorage.getItem("authData")===undefined){
      this.router.navigate(['/account/login']);
    }
    if (localStorage.getItem('language')) {
      let lang = this.listLang.find(e => e.lang === localStorage.getItem('language'));
      if (lang) {
        this.setLanguage(lang.text, lang.lang, lang.flag)
      } else {
        lang = this.listLang.find(e => e.lang === 'vi');
      }
      this.setLanguage(lang.text, lang.lang, lang.flag)
    } else {
      const viLang = this.listLang.find(e => e.lang === 'vi');
      this.setLanguage(viLang.text, viLang.lang, viLang.flag)
    }
    // this.fullname =  JSON.parse(localStorage.getItem('authData')).fullname;
    this.openMobileMenu = false;
    this.element = document.documentElement;

    // this.cookieValue = this._cookiesService.get('lang');
    // const val = this.listLang.filter(x => x.lang === this.cookieValue);
    // this.countryName = val.map(element => element.text);
    // if (val.length === 0) {
    //   if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    // } else {
    //   this.flagvalue = val.map(element => element.flag);
    // }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
    localStorage.setItem('language', lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.setItem("authData","");
    this.router.navigate(['/account/login']);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
