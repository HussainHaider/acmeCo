export class HotelDetail {
  Image: string;
  Name: string;
  Description: string;
  Rating: number;
  No_of_Rating: string;

  constructor(Image: string, Name: string, Description: string, Rating: number, No_of_Rating: string) {
    this.Image = Image;
    this.Name = Name;
    this.Description = Description;
    this.Rating = Rating;
    this.No_of_Rating = No_of_Rating;
  }
}
