import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent {
  elseBlock: TemplateRef<any>|null = null
  color: ThemePalette = 'accent'

  @Input() btn_type!: string
  @Input() btn_text!: string
  @Input() btn_disabled!: boolean
  @Input() btn_condition!: boolean

  @ViewChild('elseBlock', {static: true}) primaryBlock: TemplateRef<any>|null = null
}
