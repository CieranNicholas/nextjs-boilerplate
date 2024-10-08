import { getUserSubscriptions } from "@/actions/user.actions";
import Link from "next/link";
import { Button } from "../ui/button";
import { findPrices } from "@/data-access/price";
import { findProducts } from "@/data-access/product";
import { Price, Product } from "@prisma/client";
import PricingCard from "@/components/pricing/pricing-card";

const MOCK_FEATURES = [
  "Premium Big Beans",
  "Monthly Delivery",
  "Exclusive Garbanzo Preparation Methods",
  "Customizable Bean Options",
  "Tasting Guide",
];

interface Plan {
  price: Price;
  product: Product;
  features: string[];
}

const Pricing = async () => {
  const subscriptions = await getUserSubscriptions();

  if (subscriptions) return <IsSubscribed />;

  const { prices } = await findPrices();
  const { products } = await findProducts();

  const plans = prices
    ?.map((price) => {
      const product = products.find(
        (p) => p.stripeProductId === price.stripeProductId,
      );
      if (!product) return null;

      // TODO: Implement actual logic to determine feaatures based on the product
      const features = MOCK_FEATURES;

      return { price, product, features };
    })
    .filter((plan): plan is Plan => plan !== null);
  return (
    <div
      aria-label="Pricing Plans"
      className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row flex-wrap"
    >
      {plans && plans.length > 0 ? (
        plans.map(({ price, product, features }, index) => (
          <PricingCard
            key={product.id}
            product={product}
            price={price}
            features={features}
            highlighted={index === 0} // TODO: Determine this dynamically
            aria-labelledby={`plan-${product.id}-title`}
          />
        ))
      ) : (
        <p role="alert">No products are currently available.</p>
      )}
    </div>
  );
};

const IsSubscribed = async () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            You already have an active subscription.
          </h1>
          <p className="text-xl text-muted-foreground">
            head to your dashboard to manage your subscription.
          </p>
        </header>

        <section
          aria-label="Actions"
          className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row"
        >
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Pricing;
