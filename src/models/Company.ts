export default class Company {
  company_no: id

  constructor(client_id: int) {
    this.company_no = client_id || -1
  }

  static restore(companyData: Company) {
    return Object.assign(new Company(), companyData)
  }

  get name():string {
    this.getSettingsById().name;
  }

  get color(): string {
    return this.getSettingsById().color;
  }

  private getSettingsById() {
    let company_map = {
      "-1" :{
        name: 'Avivox',
        color: 'bg-blue-500',
      },
      "2": {
        name: 'Avivox Multimedia',
        color: 'bg-fuchsia-500',
      },
      "3": {
        name: 'Pixelmotion',
        color: 'bg-rose-800',
      },
    };

    if(this.company_no in company_map) {
      return company_map[this.company_no];
    } else {
      return {
        name: 'unkn',
        color: 'bg-red-500',
      }
    }

  }
}
