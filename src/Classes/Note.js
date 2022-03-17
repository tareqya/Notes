class Note {
  constructor(title, note, date, longitude, latitude, uid, color, image = "") {
    this.title = title;
    this.note = note;
    this.date = date;
    this.longitude = longitude;
    this.latitude = latitude;
    this.image = image;
    this.uid = uid;
    this.color = color;
    this.imageUrl = "";
    this.key = "";
  }

  toDict = () => {
    return {
      title: this.title,
      note: this.note,
      date: this.date,
      longitude: this.longitude,
      latitude: this.latitude,
      image: this.image,
      uid: this.uid,
      color: this.color,
      key: this.key,
    };
  };

  fillData = (object, key) => {
    this.title = object.title;
    this.note = object.note;
    this.image = object.image;
    this.date = object.date;
    this.longitude = object.longitude;
    this.latitude = object.latitude;
    this.uid = object.uid;
    this.color = object.color;
    this.key = key;
  };
}

export default Note;
