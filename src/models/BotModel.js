export class BotModel {
  constructor(logo, label, description, slots, id) {
    this.logo = logo;
    this.label = label;
    this.description = description;
    this.slots = slots;
    this.id = id;
  }

  parseFromJsonData = (data) => {
    const { logo, label, description, slots, id } = data;
    return new BotModel(logo, label, description, slots, id);
  };

  static parseRequestFilters = (values) => {
    return {
      network: values?.network?.label,
      start: values?.date.since,
      end: values?.date.till,
      address: values?.address,
      comeIn: values?.comeIn,
    };
  };
}
