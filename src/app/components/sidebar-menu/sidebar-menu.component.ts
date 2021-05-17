import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input() sideMenus: any;
  activeItem: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updateActiveItem();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.updateActiveItem();
      }
    });
  }

  updateActiveItem() {
    let index = this.sideMenus.findIndex((menu: any) =>
      this.router.isActive(this.router.createUrlTree(menu.route, {relativeTo: this.activatedRoute}), false)
    );
    if (index > -1) {
      this.sideMenus.map((menu: any) => menu.isActive = false);
      this.sideMenus[index].isActive = true;
      this.activeItem = this.sideMenus[index];
    }
    this.ref.markForCheck();
  }

}
