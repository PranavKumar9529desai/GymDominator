import { useEffect, useState } from 'react';
import { useHealthProfile } from '../hooks/useHealthProfile';
import type { WeeklyIngredients, WeekwiseIngredients } from '../types/ingredients';
import weekwiseIngredients from '../weekwiseingredients.json';

const healthToDietCategory: Record<string, keyof WeekwiseIngredients['categories']> = {
  underweight: 'underweight',
  normal_weight: 'normal_weight',
  overweight: 'overweight',
  obesity_class_1: 'obesity_class_1',
};

interface GroceryItem {
  id: string; // Add this new property
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

interface Props {
  week: number;
  onWeekChange?: (newWeek: number) => void; // Make this prop optional
}

export function GroceryList({ week, onWeekChange = () => {} }: Props) {
  // Provide default empty function
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { category, loading: healthLoading } = useHealthProfile();

  useEffect(() => {
    const fetchGroceryList = async () => {
      if (!category) return;

      try {
        const dietCategory = healthToDietCategory[category];
        if (!dietCategory) {
          throw new Error(`Invalid category: ${category}`);
        }

        const typedIngredients = weekwiseIngredients as unknown as WeekwiseIngredients;
        const categoryIngredients = typedIngredients.categories[dietCategory];
        const weeklyIngredients = categoryIngredients[
          `week_${week}` as keyof typeof categoryIngredients
        ] as WeeklyIngredients;

        const items: GroceryItem[] = [];

        for (const categoryKey of Object.keys(weeklyIngredients) as Array<
          keyof WeeklyIngredients
        >) {
          if (categoryKey !== 'quantities') {
            const ingredientList = weeklyIngredients[categoryKey];
            if (Array.isArray(ingredientList)) {
              for (const name of ingredientList) {
                items.push({
                  id: `${categoryKey}-${name}`,
                  name,
                  category: categoryKey as string,
                  quantity: weeklyIngredients.quantities[name] || 'As needed',
                  checked: false,
                });
              }
            }
          }
        }

        setGroceries(items);
      } catch (error) {
        console.error('Failed to process grocery list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceryList();
  }, [week, category]);

  const toggleItem = (id: string) => {
    // Change parameter to id
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto ">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Weekly Grocery List</h2>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            type="button"
            onClick={() => week > 1 && onWeekChange(week - 1)}
            disabled={week <= 1}
            className="inline-flex items-center p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Previous Week</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-indigo-600">Week {week}</span>
            <span className="ml-2 text-gray-500">of 4</span>
          </div>

          <button
            type="button"
            onClick={() => week < 4 && onWeekChange(week + 1)}
            disabled={week >= 4}
            className="inline-flex items-center p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next week"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Next Week</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {loading || healthLoading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {Object.entries(
            groceries.reduce(
              (acc, item) => {
                const category = item.category;
                if (!acc[category]) acc[category] = [];
                acc[category].push(item);
                return acc;
              },
              {} as Record<string, GroceryItem[]>
            )
          ).map(([category, items]: [string, GroceryItem[]]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <h3 className="text-lg font-semibold p-4 bg-gray-50 border-b">{category}</h3>
              <div className="divide-y divide-gray-200">
                {items.map((item: GroceryItem) => (
                  <div
                    key={item.id} // Change key to use id
                    className="flex items-center p-4 border-b last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)} // Change to pass item.id
                      className="h-5 w-5 text-indigo-600 rounded"
                    />
                    <span
                      className={`ml-3 flex-1 ${item.checked ? 'line-through text-gray-400' : ''}`}
                    >
                      {item.name}
                    </span>
                    <span className="text-gray-500">{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
