<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section>
            <div class="text-center q-mb-md">
              <q-avatar color="grey-3" icon="mdi-server" text-color="black" />
            </div>
            <h2>Hosting costs</h2>
            <div class="price">
              <span>€</span><span>12</span>
              <div>monthly</div>
            </div>
            <div class="q-gutter-y-sm q-mt-md">
              <div class="text-body2">✅ Cover hosting costs</div>
              <div class="text-body2">❌ Our developer works for €0 hourly</div>
              <div class="text-body2">❌ No solidarity contribution</div>
            </div>
            <q-btn
              label="Buy Now"
              class="full-width q-mt-sm"
              color="black"
              outline
              no-caps
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section>
            <div class="text-center q-mb-md">
              <q-avatar color="grey-3" icon="mdi-lightning-bolt" />
            </div>
            <h2>Fair wage</h2>
            <div class="price">
              <span>€</span><span>16</span>
              <div>monthly</div>
            </div>
            <div class="q-gutter-y-sm q-mt-md">
              <div class="text-body2">✅ Cover hosting costs</div>
              <div class="text-body2">
                ✅ Our developers can pay groceries & rent
              </div>
              <div class="text-body2">❌ No solidarity contribution</div>
            </div>
            <q-btn
              label="Buy Now"
              class="full-width q-mt-sm"
              color="black"
              outline
              no-caps
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section>
            <div class="text-center q-mb-md">
              <q-avatar icon="mdi-heart" text-color="white" class="gradient" />
            </div>
            <h2>Solidarity</h2>
            <div class="price">
              <span>€</span><span class="gradient-text">24</span>
              <div>monthly</div>
            </div>
            <div class="q-gutter-y-sm q-mt-md">
              <div class="text-body2">✅ Cover hosting costs</div>
              <div class="text-body2">
                ✅ Our developers can pay groceries & rent
              </div>
              <div class="text-body2">✅ Pay for those who can’t afford it</div>
            </div>
            <q-btn
              label="Buy Now"
              class="full-width q-mt-sm gradient"
              text-color="white"
              no-caps
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 text-body2 text-center q-mt-md">
        <q-card flat bordered>
          <q-card-section>
            Can't afford a subscription? Sends us an email:
            <a href="mailto:hey@rebel.tools">hey@rebel.tools</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
h2 {
  font-size: 24px;
  text-align: center;
}
.price {
  margin: 14px 0;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  span {
    vertical-align: -30%;
  }
  span:nth-child(2) {
    font-size: 64px;
    font-weight: 700;
    margin-right: 10px;
  }
}
</style>
