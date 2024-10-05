<template>
    <div class="crash-history">
      <div class="history-list">
        <CrashHistoryElement
          v-for="game of crashHistory"
          :key="game._id"
          :game="game"
          :class="{ 'first-element': isFirst(game) }"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import CrashHistoryElement from '@/components/crash/CrashHistoryElement';
  
  export default {
    name: 'CrashHistory',
    components: {
      CrashHistoryElement
    },
    computed: {
      ...mapGetters(['crashHistory'])
    },
    methods: {
      isFirst(game) {
        return this.crashHistory.indexOf(game) === 0;
      }
    }
  };
  </script>
  
  <style scoped>
  .crash-history {
    width: 100%;
    position: relative;
    margin-top: 15px;
    overflow: hidden;
  }
  
  .crash-history::after {
    content: '';
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(90deg, rgba(7, 44, 68, 0) 0%, #072c44 100%);
    z-index: 1;
  }
  
  .crash-history .history-list {
    display: flex;
    gap: 10px;
  }
  
  @media only screen and (max-width: 1140px) {
    .crash-history {
      margin-top: 10px;
    }
  }
  </style>
  