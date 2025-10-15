// material-imports.ts
// ضع هذا الملف في src/app/shared/

import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Export all Material components/modules as an array
export const MATERIAL_IMPORTS = [
  // Form Field & Input
  MatFormFieldModule,
  MatInputModule,

  // Datepicker
  MatDatepickerModule,

  // Button
  MatButton,

  // Menu components
  MatMenu,
  MatMenuTrigger,
  MatMenuItem,
];

// يمكنك أيضاً export كل واحد على حدة للاستخدام المباشر
export {
  MatButton,
  MatMenu,
  MatMenuTrigger,
  MatMenuItem,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule
};
