/*
individual trash record:
trash type: string
trash weight: number
trash points: number

final trash record:
totalPoints: number
totalWeight: number
itemsRecycled: 5
individualWaste: {
    paper: number
    plastic: number
    glass: number
    metal: number
    cardboard: number
}
*/

const TRASH_POINT_VALUES = {
  paper: 1.5,
  plastic: 9.5,
  glass: 1,
  metal: 77,
  cardboard: 2,
};

export class TrashRecord {
  trashType: string;
  trashWeightGrams: number;
  trashPoints: number;

  constructor(trashType: string, trashWeightGrams: number) {
    this.trashType = trashType;
    this.trashWeightGrams = trashWeightGrams;
    this.trashPoints = 0;

    // calculate trash points
    const pointValue = TRASH_POINT_VALUES[trashType];
    if (pointValue !== undefined) {
      this.trashPoints = (trashWeightGrams / 100) * pointValue;
    } else {
      console.error(`Unknown trash type: ${trashType}`);
    }
  }
}

export class TotalTrashRecords {
  totalPoints: number;
  totalWeight: number;
  itemsRecycled: number;
  individualWaste: {
    paper: number;
    plastic: number;
    glass: number;
    metal: number;
    cardboard: number;
  };

  constructor(wasteRecords: TrashRecord[]) {
    // initialize values
    this.totalPoints = 0;
    this.totalWeight = 0;
    this.itemsRecycled = 0;
    this.individualWaste = {
      paper: 0,
      plastic: 0,
      glass: 0,
      metal: 0,
      cardboard: 0,
    };

    // iterate through wasteRecords and calculate the values
    for (let i = 0; i < wasteRecords.length; i++) {
      this.totalPoints += wasteRecords[i].trashPoints;
      this.totalWeight += wasteRecords[i].trashWeightGrams;
      this.itemsRecycled++;
      switch (wasteRecords[i].trashType) {
        case "paper":
          this.individualWaste.paper += wasteRecords[i].trashWeightGrams;
          break;
        case "plastic":
          this.individualWaste.plastic += wasteRecords[i].trashWeightGrams;
          break;
        case "glass":
          this.individualWaste.glass += wasteRecords[i].trashWeightGrams;
          break;
        case "metal":
          this.individualWaste.metal += wasteRecords[i].trashWeightGrams;
          break;
        case "cardboard":
          this.individualWaste.cardboard += wasteRecords[i].trashWeightGrams;
          break;
      }
    }

    // round off the values
    this.totalPoints = Math.round(this.totalPoints);
    this.totalWeight = Math.round(this.totalWeight * 100) / 100;
    this.individualWaste.paper =
      Math.round(this.individualWaste.paper * 100) / 100;
    this.individualWaste.plastic =
      Math.round(this.individualWaste.plastic * 100) / 100;
    this.individualWaste.glass =
      Math.round(this.individualWaste.glass * 100) / 100;
    this.individualWaste.metal =
      Math.round(this.individualWaste.metal * 100) / 100;
    this.individualWaste.cardboard =
      Math.round(this.individualWaste.cardboard * 100) / 100;
  }

  public getJSONString(): String {
    return JSON.stringify(this);
  }

  public getMinifiedJSONString(): String {
    return `{"tp":${this.totalPoints},"tw":${this.totalWeight},"ir":${this.itemsRecycled},"iw":{"p":${this.individualWaste.paper},"pl":${this.individualWaste.plastic},"g":${this.individualWaste.glass},"m":${this.individualWaste.metal},"c":${this.individualWaste.cardboard}}}`;
  }
}
