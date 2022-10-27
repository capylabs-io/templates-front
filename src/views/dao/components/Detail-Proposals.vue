<template>
  <div class="pa-4 box-gray-12 rounded-lg">
    <div class="d-flex justify-space-between">
      <div class="pa-0 cursor-pointer" text @click="vm.backSolendDao()">
        <v-icon small color="blueJeans"> mdi-chevron-left</v-icon>
        <span class="text-capitalize blueJeans--text">Back</span>
      </div>
      <div class="pa-0">
        <v-icon class="ml-4" color="blueJeans">mdi-launch</v-icon>
      </div>
    </div>
    <div class="d-flex justify-space-between mt-3">
      <div class="text-lg white--text font-weight-bold">
        SLND3: Introduce Account Borrow Limit
      </div>
      <div text class="text-sm pa-0">
        <v-icon color="blueJeans cursor-pointer">mdi-vanish</v-icon>
        <span class="text-capitalize blueJeans--text ml-1">Voting</span>
      </div>
    </div>
    <div class="pa-4 box-gray-13 mt-4 text-sm font-weight-regular white--text">
      <div>Dear Solend community,</div>

      <div>
        The Solend whale situation is continuing to impose a heavy strain on
        Solend users. Users still can't withdraw USDC, positions collateralized
        by USDC still can't be liquidated, and there's still systemic risk on
        Solend.
      </div>
      <div>We propose the following:</div>
      <ul class="gray6--text">
        <li>
          Introduce a per-account borrow limit of $50M. Any debt above this
          limit will be eligible for liquidation, regardless of collateral
          value.
        </li>
        <li>
          Roll this out gradually by starting the per-account borrow limit at
          $120M USD and reducing it gradually until $50M is reached. A reduction
          of $500K per hour will be targeted.
        </li>
        <li>
          Temporarily reduce the maximum liquidation close factor from 20% to
          1%. This caps the amount that can be liquidated in a single
          transaction.
        </li>
        <li>
          Temporarily reduce the liquidation penalty for SOL from 5% to 2%. This
          should reduce liquidator spam while still being enough of a bonus for
          liquidators to break even on slippage.
        </li>
      </ul>
      <div>
        Solend is reaching out to market makers to help provide better on-chain
        liquidity. This combined with our proposals should reduce DEX market
        impact to a manageable level.
      </div>

      <div>
        If approved, the proposal will take effect as soon as possible. Due to
        the need to move quickly, consider the 24 hour voting period as notice
        for users to reduce their borrow positions.
      </div>

      <div>
        Solend will be in contact with liquidators to modify their bots to
        account for these changes.
      </div>

      <div>
        We acknowledge that a user could split their account up to circumvent
        the per-account borrow limit. This proposal is a temporary solution to
        mitigate immediate problems and risk, and this problem can be addressed
        in the future.
      </div>

      <div>Options</div>

      <div>
        Vote Yes: Introduce a per-account borrow limit of $50M, temporarily
        reduce the liquidation close factor to 1%, and temporarily reduce the
        liquidation penalty to 2%.
      </div>

      <div>Vote No: Do nothing.</div>
    </div>
    <div class="d-flex justify-space-between pt-3" v-if="vm.isVoted && !vm.isVoteDone">
      <v-btn
          color="gray60"
          height="34px"
          outlined
          class="px-4 text-capitalize"
          @click="vm.voteExcute()"
          >Inspect</v-btn
        >
        <v-btn
          class="btn-gray-11 white--text font-weight-bold text-capitalize rounded-lg px-4"
          @click="vm.voteExcute()"
          :loading = vm.loading
          >Execute</v-btn>
    </div>
    <div class="d-flex justify-space-between pt-3" v-if="vm.isVoteDone">
      <v-btn
          color="gray60"
          height="34px"
          outlined
          class="px-4 text-capitalize"
          >Inspect executed instruction</v-btn
        >
        <v-btn outlined color="emerald">
          <div class="d-flex align-center">
            <v-icon>mdi-check</v-icon>
            <div class="text-capitalize align-seft-center">Executed</div>
          </div>
        </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Inject, Vue } from "vue-property-decorator";
import { DaoViewModel } from "../models/dao-viewmodels";

@Observer
@Component({
  components: {},
})
export default class DetailProposal extends Vue {
  @Inject() vm!: DaoViewModel;
}
</script>
<style scoped>
</style>