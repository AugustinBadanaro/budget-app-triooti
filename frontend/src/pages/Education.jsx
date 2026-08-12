export default function Education() {
  const sections = [
    {
      title: "La règle 50/30/20 : le principe",
      text: "Répartissez votre revenu en trois enveloppes. 50% pour l'essentiel : ce qui revient chaque mois et qu'on ne peut pas éviter (loyer, factures, nourriture). 30% pour le variable : ce qui fluctue selon vos choix (sorties, shopping, abonnements optionnels). 20% pour l'épargne : ce que vous mettez de côté avant même de le dépenser. Dans Budgetly, chaque catégorie que vous créez appartient à l'un de ces trois groupes, et c'est ce classement qui pilote la répartition automatique.",
    },
    {
      title: "Payez-vous en premier",
      text: "Une astuce classique en finance personnelle : traitez l'épargne comme une dépense fixe, pas comme ce qui reste à la fin du mois. Si vous attendez la fin du mois pour épargner, il ne reste souvent rien. C'est pour ça que l'épargne a son propre groupe (20%) dans la répartition automatique, au même titre que vos charges essentielles.",
    },
    {
      title: "Utiliser la répartition automatique",
      text: "Dans Budgets, entrez votre revenu mensuel et cliquez sur Calculer. L'application propose un budget par catégorie selon son groupe. Vous pouvez ajuster chaque montant avant de valider. La proposition est un point de départ, pas une règle absolue. Une fois validée, elle crée vos budgets du mois et votre revenu est enregistré pour les prochains calculs.",
    },
    {
      title: "Lire vos indicateurs (KPI)",
      text: "Le tableau de bord ne se contente pas d'additionner vos dépenses, il vous donne une lecture de tendance : le taux d'épargne montre la part de votre revenu réellement mise de côté ce mois-ci, la projection estime où vous serez en fin de mois si votre rythme de dépense actuel continue, et le respect des budgets pointe les catégories où vous risquez un dépassement avant qu'il n'arrive.",
    },
    {
      title: "Pourquoi certaines dépenses sont difficiles à réduire",
      text: "Les dépenses essentielles sont rigides à court terme (on ne change pas de logement du jour au lendemain), donc les efforts d'économie les plus rapides se trouvent presque toujours dans le groupe variable. Repérer une catégorie variable qui dérive d'un mois à l'autre est souvent le levier le plus simple pour retrouver de la marge.",
    },
    {
      title: "La règle des 3 secondes avant un achat",
      text: "Avant une dépense variable non planifiée, demandez-vous : est-ce que j'en ai besoin maintenant, est-ce que ça rentre dans mon budget du mois, et est-ce que je le regretterai dans une semaine ? Ce petit réflexe suffit souvent à éviter les achats impulsifs qui, cumulés, pèsent plus qu'on ne le pense sur un budget mensuel.",
    },
    {
      title: "Suivre au fil de l'eau plutôt qu'en fin de mois",
      text: "Enregistrer une dépense juste après l'avoir faite prend quelques secondes et évite l'effet 'où est passé mon argent' en fin de mois. Une transaction oubliée aujourd'hui fausse votre taux d'épargne et votre projection jusqu'à ce que vous la rattrapiez; mieux vaut la noter tout de suite.",
    },
  ];

  return (
    <div>
      <h2>Education financière</h2>
      <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 20 }}>
        Quelques repères pour mieux comprendre vos finances et tirer parti de Budgetly
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {sections.map((s, i) => (
          <div className="card" key={i}>
            <h3 style={{ fontSize: 14.5, marginBottom: 8, fontWeight: 600 }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}