import { useOutletContext } from "react-router-dom";
import CategoryManager from "../components/CategoryManager";

export default function Settings() {
  const { categories, setCategories } = useOutletContext();

  return (
    <div>
      <h2>Paramètres</h2>
      <CategoryManager categories={categories} onCategoriesChange={setCategories} />
    </div>
  );
}