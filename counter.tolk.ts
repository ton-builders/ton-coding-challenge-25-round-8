export function main(ctx: TolkBuilder) {
  const count = ctx.uint("count", 0n);

  function modify(by: bigint) {
    count.set(count.get() + by);
  }

  ctx.external("Inc", (msg) => {
    const delta = msg.body.uint(32);
    modify(delta);
  });

  ctx.external("Dec", (msg) => {
    const delta = msg.body.uint(32);
    modify(-delta);
  });

  ctx.getter("Current", () => {
    return count.get();
  });
}
