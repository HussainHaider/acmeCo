export class CarDetail {
  Image: string;
  Name: string;
  Description: string;
  Price: string;

  constructor(Image: string, Name: string, Description: string, Price: string) {
    this.Image = Image;
    this.Name = Name;
    this.Description = Description;
    this.Price = Price;
  }
}
