import React from 'react';

function TripExtras({ trip }) {
  const data = trip?.tripdata || {};

  const budget = data.budget_summary;
  const transport = data.transportation_tips;
  const tips = data.cultural_and_practical_tips;
  const packing = data.packing_advice;

  // convenience pulls
  const breakdown = budget?.breakdown;
  const essentials = Array.isArray(packing?.essentials) ? packing.essentials : [];
  const transportTips = Array.isArray(transport?.tips) ? transport.tips : [];
  const cultureTips = Array.isArray(tips) ? tips : [];

  // If literally nothing exists, don't render
  const nothingToShow =
    !budget && !transport && !tips && !packing;

  if (nothingToShow) return null;

  return (
    <section className="mt-10 flex flex-col gap-8">

      {/* Budget Summary */}
      {budget && (
        <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
          <div className="p-5 border-b bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="money">💸</span>
              Budget Overview
            </h2>
          </div>

          <div className="p-5 flex flex-col gap-4 text-sm text-gray-700">
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-gray-500 text-xs uppercase">Daily Budget</div>
                <div className="font-semibold">
                  {budget.currency} {budget.daily_estimated_budget}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase">Trip Total</div>
                <div className="font-semibold">
                  {budget.currency} {budget.total_estimated_budget}
                </div>
              </div>
              {budget.budget_type && (
                <div>
                  <div className="text-gray-500 text-xs uppercase">Type</div>
                  <div className="font-semibold">
                    {budget.budget_type}
                  </div>
                </div>
              )}
            </div>

            {breakdown && (
              <div className="mt-4">
                <div className="text-gray-500 text-xs uppercase mb-2">Breakdown</div>
                <ul className="list-disc ml-5 space-y-1">
                  {breakdown.accommodation_1_night && (
                    <li>
                      Stay / Night: {budget.currency} {breakdown.accommodation_1_night}
                    </li>
                  )}
                  {breakdown.food_and_drink && (
                    <li>
                      Food & Drink: {budget.currency} {breakdown.food_and_drink}
                    </li>
                  )}
                  {breakdown.local_transport && (
                    <li>
                      Transport: {budget.currency} {breakdown.local_transport}
                    </li>
                  )}
                  {breakdown.activities_and_tickets && (
                    <li>
                      Activities & Tickets: {budget.currency} {breakdown.activities_and_tickets}
                    </li>
                  )}
                  {breakdown.miscellaneous_and_buffer && (
                    <li>
                      Buffer/Misc: {budget.currency} {breakdown.miscellaneous_and_buffer}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transportation Tips */}
      {transport && (
        <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
          <div className="p-5 border-b bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="car">🚕</span>
              Getting Around
            </h2>
          </div>

          <div className="p-5 text-sm text-gray-700 flex flex-col gap-3">
            {transport.main_method && (
              <p>
                <span className="font-semibold">Main method:</span>{' '}
                {transport.main_method}
              </p>
            )}

            {transportTips.length > 0 && (
              <ul className="list-disc ml-5 space-y-2">
                {transportTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Cultural / Practical Tips */}
      {cultureTips.length > 0 && (
        <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
          <div className="p-5 border-b bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="lightbulb">💡</span>
              Cultural & Practical Tips
            </h2>
          </div>

          <div className="p-5 text-sm text-gray-700">
            <ul className="list-disc ml-5 space-y-2">
              {cultureTips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Packing Advice */}
      {packing && (
        <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
          <div className="p-5 border-b bg-gray-50">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span role="img" aria-label="luggage">🧳</span>
              Packing & Weather
            </h2>
          </div>

          <div className="p-5 text-sm text-gray-700 flex flex-col gap-4">
            {/* Season + Weather */}
            <div className="flex flex-col gap-1">
              {packing.season_assumption && (
                <p>
                  <span className="font-semibold">Season:</span>{' '}
                  {packing.season_assumption}
                </p>
              )}

              {packing.weather && (
                <p>
                  <span className="font-semibold">Weather:</span>{' '}
                  {packing.weather}
                </p>
              )}
            </div>

            {/* Essentials list */}
            {essentials.length > 0 && (
              <div>
                <div className="text-gray-500 text-xs uppercase mb-2">
                  Essentials
                </div>
                <ul className="list-disc ml-5 space-y-2">
                  {essentials.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TripExtras;