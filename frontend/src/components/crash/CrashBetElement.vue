<template>
  <div class="crash-bet-element" :class="{ 'first-element': isFirst }">
    <div class="avatar">
      <AvatarImage :image="bet.user.avatar" />
    </div>
    <div class="bet-info">
      <div class="user-info">
        <span class="username">{{ bet.user.username }}</span>
        <span v-if="bet.multiplier !== undefined" class="multiplier">{{ formattedMultiplier }}</span>
      </div>
      <div class="amount">
        <img class="coin-icon" src="@/assets/img/icons/coin.svg" alt="icon" />
        <span class="amount-value">{{ formattedAmount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarImage from '@/components/AvatarImage';

export default {
  name: 'CrashBetElement',
  components: {
    AvatarImage
  },
  props: {
    bet: {
      type: Object,
      required: true
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedAmount() {
      let amount = parseFloat(Math.floor(this.bet.amount / 10) / 100).toFixed(2);
      if (this.bet.multiplier !== undefined) {
        amount = '+' + parseFloat(Math.floor((this.bet.amount * (this.bet.multiplier / 100)) / 10) / 100).toFixed(2);
      }
      return amount;
    },
    formattedMultiplier() {
      return (this.bet.multiplier / 100).toFixed(2) + 'x';
    }
  }
}
</script>

<style scoped>
.crash-bet-element {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.crash-bet-element.first-element {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 50%;
  overflow: hidden;
}

.bet-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.username {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}

.multiplier {
  font-size: 12px;
  font-weight: bold;
  color: #4caf50; /* Green color for positive multipliers */
}

.amount {
  display: flex;
  align-items: center;
}

.coin-icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
}

.amount-value {
  font-size: 12px;
  font-weight: bold;
  color: #333333;
}

.crash-bet-element:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
