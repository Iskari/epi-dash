export default class Company {
  company_no: number

  constructor(company_no?: number) {
    this.company_no = company_no ?? -1
  }

  static restore(companyData: Partial<Company>): Company {
    const instance = new Company()
    return Object.assign(instance, companyData)
  }

  get name(): string {
    return this.getSettingsById().name
  }

  get color(): string {
    return this.getSettingsById().color
  }

  get tint(): string {
    return this.getSettingsById().tint
  }

  getSettingsById(): any {
    const key = String(this.company_no)
    let company_map: Record<string, { name: string; color: string; tint: string }> = {
      '0': {
        name: 'Avivox',
        color: 'bg-blue-500',
        tint: 'bg-blue-500/10'
      },
      '2': {
        name: 'Avivox Multimedia',
        color: 'bg-fuchsia-500',
        tint: 'bg-fuchsia-500/10'
      },
      '3': {
        name: 'Pixelmotion',
        color: 'bg-rose-800',
        tint: 'bg-rose-800/10'
      }
    }

    if (key in company_map) {
      return company_map[key]
    } else {
      return {
        name: 'unkn',
        color: 'bg-red-500',
        tint: 'bg-red-500/10'
      }
    }
  }
}
