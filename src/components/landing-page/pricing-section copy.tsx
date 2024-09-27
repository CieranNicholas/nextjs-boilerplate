import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SubscribeSection = () => {
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex justify-center items-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied customers and transform your business
              today.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
