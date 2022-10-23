import { action, observable } from "mobx";

export class DaoViewModel {
  @observable isOpenAddProposal = false;

  @action changeAddProposalDialog() {
    this.isOpenAddProposal = !this.isOpenAddProposal;
  }
}
