<template>
  <section class="mt-10">
    <div class="flex items-center justify-between mb-6">
      <h2 class="flex items-center gap-2 text-xl font-black text-gray-900">
        <i :class="icon" class="text-[#0051ff]" />
        {{ title }}
      </h2>
      <router-link to="/products" class="text-sm font-black text-[#0051ff]">
        Xem tất cả <i class="fa-solid fa-arrow-right text-xs" />
      </router-link>
    </div>

    <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
      <router-link
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="category-item"
        :class="{ highlighted: item.highlight }"
      >
        <span class="icon-wrap">
          <i :class="item.icon" />
        </span>
        <span class="label">{{ item.label }}</span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CategoryGrid',
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: Array, required: true }
  }
}
</script>

<style scoped>
.category-item {
  min-height: 112px;
  border: 1px solid transparent;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #111827;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.category-item:hover {
  border-color: #d7def8;
  box-shadow: 0 14px 28px rgba(0, 81, 255, 0.08);
  transform: translateY(-2px);
}

.category-item.highlighted {
  border-color: #ffd400;
}

.icon-wrap {
  width: 78px;
  height: 78px;
  border-radius: 999px;
  background: #eceeff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0051ff;
  font-size: 28px;
}

.highlighted .icon-wrap {
  background: #fff9d9;
}

.label {
  font-size: 13px;
  font-weight: 900;
  line-height: 1.25;
}
</style>
