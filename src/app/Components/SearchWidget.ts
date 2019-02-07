export class SearchWidget {
  public countryList = [];
  public mySet = new Set();

  constructor() {
  }

  RenderObjects = function () {
    return new SearchWidget();
  };
  capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render = function (value) {
    value = this.capitalizeFirstLetter(value);
    if (value === '') {
      document.getElementById('browsers').innerHTML = '';
    } else {
      for (let index = 0; index < this.countryList.length; index++) {
        if (this.countryList[index].indexOf(value) >= 0) {
          this.mySet.add(this.countryList[index]);
        }
      }
    }
    let html = '';
    for (let it = this.mySet.values(), val = null; val = it.next().value;) {
      // const z = document.createElement('OPTION');
      // z.setAttribute('value', val);
      html += '<option value=' + val + '>' + '</option>';
    }
    return html;
  };
  clearSet = function () {
    this.mySet.clear();
  };
  addData = function (data) {
    const html = '<option value=' + data + '>' + '</option>';
    return html;
  };
}

