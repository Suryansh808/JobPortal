import { useState } from 'react';

function UpgradePackage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex justify-center items-center py-4">
      <input className="peer/option1 sr-only" id="option-1" type="radio" name="panel" />
      <input className="peer/option2 sr-only" id="option-2" type="radio" name="panel" />
      <input className="peer/option3 sr-only" id="option-3" type="radio" name="panel" />
      <h1 className="sr-only">Pricing</h1>
      <main className="grid md:grid-cols-3 min-[400px]:grid-cols-1 gap-4 w-full max-w-xs md:max-w-4xl 
        ... /* existing styles */
        ">
        {/* Premium Plan */}
        <article id="price-1" className="group">
          <hgroup className="gradient">
            <p>$29<span>/mo</span></p>
            <h2>Premium</h2>
          </hgroup>
          <main>
            <ul role="list">
              <li>5GB of space</li>
              <li>Unlimited traffic</li>
              <li>24/7 support</li>
              <li>Additional features</li>
            </ul>
            <label htmlFor="option-1" className="group/btn" onClick={() => handlePlanSelection('premium')}>
              <div className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
            </label>
          </main>
          <div className="waves group-hover:inset-[-40%_-20%_0_-40%] ">
            {/* SVG here */}
          </div>
        </article>

        {/* Platinum Plan */}
        <article id="price-2" className="group">
          <hgroup className="gradient">
            <p>$99<span>/mo</span></p>
            <h2>Platinum</h2>
          </hgroup>
          <main>
            <ul>
              <li>15GB of space</li>
              <li>Unlimited traffic</li>
              <li>Priority support</li>
              <li>Exclusive features</li>
            </ul>
            <label htmlFor="option-2" className="group/btn" onClick={() => handlePlanSelection('platinum')}>
              <div className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
            </label>
          </main>
          <div className="waves group-hover:inset-[-40%_-10%_0_0%]">
            {/* SVG here */}
          </div>
        </article>

        {/* Custom Plan */}
        <article id="price-3" className="group">
          <hgroup className="gradient">
            <p>Custom<span>/mo</span></p>
            <h2>Custom</h2>
          </hgroup>
          <main>
            <ul>
              <li>Custom space</li>
              <li>Custom traffic</li>
              <li>Personalized support</li>
              <li>Tailored features</li>
            </ul>
            <label htmlFor="option-3" className="group/btn" onClick={() => handlePlanSelection('custom')}>
              <div className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
            </label>
          </main>
          <div className="waves group-hover:inset-[-40%_-40%_0_-0%]">
            {/* SVG here */}
          </div>
        </article>
      </main>

      {selectedPlan && (
        <PaymentSection plan={selectedPlan} />
      )}
    </div>
  );
}

function PaymentSection({ plan }) {
  return (
    <div className="payment-section">
      <h2>Payment Details for {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan</h2>
      <form>
        {/* Credit/Debit Card Details */}
        <div>
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" name="card-number" />
        </div>
        <div>
          <label htmlFor="expiry-date">Expiry Date</label>
          <input type="text" id="expiry-date" name="expiry-date" />
        </div>
        <div>
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" />
        </div>

        {/* PhonePay */}
        <div>
          <label>
            <input type="radio" name="payment-method" value="phonepay" />
            PhonePay
          </label>
        </div>

        {/* PayPal */}
        <div>
          <label>
            <input type="radio" name="payment-method" value="paypal" />
            PayPal
          </label>
        </div>

        {/* Paytm */}
        <div>
          <label>
            <input type="radio" name="payment-method" value="paytm" />
            Paytm
          </label>
        </div>

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

export default UpgradePackage;
