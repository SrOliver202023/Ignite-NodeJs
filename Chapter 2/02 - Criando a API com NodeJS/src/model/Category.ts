import { v4 as uuidv4 } from 'uuid';

interface iCategory {
  id?: string;
  name: string;
  description: string;
  created_at: Date;
}

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Category };