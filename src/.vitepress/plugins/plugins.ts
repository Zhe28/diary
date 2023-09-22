// const plugins: Function [] = [];
export function plugin(plugins: Function[]) {
  for (const plugin of plugins) {
    plugin();
  }
}
