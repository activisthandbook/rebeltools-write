<template>
  <q-layout
    view="hHh lpR fFf"
    container
    class="bg-white"
    style="max-width: 1024px"
  >
    <q-header class="text-black" style="background-color: #fafafa">
      <q-toolbar>
        <q-toolbar-title>Rebel Write</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding style="max-width: 700px; margin: auto">
        <div class="q-gutter-y-sm">
          <h1>You've used up your free 3 articles this month.</h1>
          <div>
            <strong>Help us build more awesome tools for change-makers.</strong>
            Developing these tools costs time and money. Support our work by
            subscribing to Rebel Write.
          </div>
          <div>
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-4">
                <q-card>
                  <q-card-section>
                    <div class="text-center q-mb-md">
                      <q-avatar
                        color="grey-3"
                        icon="mdi-server"
                        text-color="black"
                      />
                    </div>
                    <h2>Hosting costs</h2>
                    <div class="price">
                      <span>€</span><span>2</span>
                      <div>monthly</div>
                      <q-chip
                        label="📝 20 articles"
                        class="q-mt-md"
                        size="sm"
                        outline
                      />
                    </div>
                    <div class="q-gutter-y-sm q-mt-sm">
                      <div class="text-body2">✅ Cover hosting costs</div>
                      <div class="text-body2">
                        ❌ Our developer works for €0 hourly
                      </div>
                      <div class="text-body2">
                        ❌ No solidarity contribution
                      </div>
                    </div>
                    <q-btn
                      label="Buy Now"
                      class="full-width q-mt-sm"
                      color="black"
                      outline
                      no-caps
                      @click="subscribe(subscriptions.hostingCosts)"
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
                      <q-chip
                        label="📝 25 articles"
                        class="q-mt-md"
                        size="sm"
                        outline
                      />
                    </div>
                    <div class="q-gutter-y-sm q-mt-sm">
                      <div class="text-body2">✅ Cover hosting costs</div>
                      <div class="text-body2">
                        ✅ Our developers can pay groceries & rent
                      </div>
                      <div class="text-body2">
                        ❌ No solidarity contribution
                      </div>
                    </div>
                    <q-btn
                      label="Buy Now"
                      class="full-width q-mt-sm"
                      color="black"
                      outline
                      no-caps
                      @click="subscribe(subscriptions.fairWage)"
                    />
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-xs-12 col-sm-4">
                <q-card>
                  <q-card-section>
                    <div class="text-center q-mb-md">
                      <q-avatar
                        icon="mdi-heart"
                        text-color="white"
                        class="gradient"
                      />
                    </div>
                    <h2>Solidarity</h2>
                    <div class="price">
                      <span>€</span><span class="gradient-text">24</span>
                      <div>monthly</div>
                      <q-chip
                        label="📝 100 articles"
                        class="q-mt-md gradient"
                        size="sm"
                        dark
                      />
                    </div>
                    <div class="q-gutter-y-sm q-mt-sm">
                      <div class="text-body2">✅ Cover hosting costs</div>
                      <div class="text-body2">
                        ✅ Our developers can pay groceries & rent
                      </div>
                      <div class="text-body2">
                        ✅ Pay for those who can’t afford it
                      </div>
                    </div>
                    <q-btn
                      label="Buy Now"
                      class="full-width q-mt-sm gradient"
                      text-color="white"
                      no-caps
                      @click="subscribe(subscriptions.solidarity)"
                    />
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 text-body2 text-center q-mt-sm">
                <q-card flat bordered>
                  <q-card-section>
                    Can't afford a subscription? Sends us an email:
                    <a href="mailto:hey@rebel.tools">hey@rebel.tools</a>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import {
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore();

export default {
  data: function () {
    return {
      subscriptions: {
        hostingCosts: "price_1Kltt6BSVP8XWTrFwH8SZa8H",
        fairWage: "price_1KlttWBSVP8XWTrFKjAIoz1A",
        solidarity: "price_1KlttsBSVP8XWTrFxK1BT0pY",
      },
    };
  },
  methods: {
    async subscribe(priceID) {
      this.$q.loading.show();
      const docRef = await addDoc(
        collection(
          db,
          "customers",
          this.$store.state.auth.data.uid,
          "checkout_sessions"
        ),
        {
          price: priceID,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );
      // Wait for the CheckoutSession to get attached by the extension
      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data();
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          alert(`An error occured: ${error.message}`);
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          window.location.assign(url);
        }
      });
    },
  },
};
</script>

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
