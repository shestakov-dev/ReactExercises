import { Accordion, AccordionItem } from "../components/Accordion";
import { ExerciseLayout } from "../layouts/ExerciseLayout";

export function AccordionPage() {
	return (
		<ExerciseLayout exerciseId={3}>
			<Accordion>
				<AccordionItem title="Lorem ipsum">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
						necessitatibus omnis, nam ducimus laborum maxime tenetur quis magni
						voluptates consequuntur voluptatibus neque vel assumenda porro, rem eos
						quod recusandae repudiandae.
					</p>
				</AccordionItem>
				<AccordionItem title="Dolor sit">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum explicabo
						eius voluptatibus commodi vero unde reiciendis iusto accusantium
						asperiores enim? Rem reiciendis iste debitis voluptatum similique dicta
						culpa adipisci at.
					</p>
				</AccordionItem>
				<AccordionItem title="Amet consectetur">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium,
						fugiat. Maxime veritatis expedita cumque? Et eligendi minima rem quisquam
						molestias incidunt culpa, aperiam reprehenderit quia inventore praesentium
						dicta error veritatis.
					</p>
				</AccordionItem>
				<AccordionItem title="Adipisicing elit">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione cumque
						aliquid unde doloremque ex! Optio, delectus dolor omnis exercitationem
						cupiditate perspiciatis, nemo blanditiis maxime adipisci voluptate
						repellendus vel tenetur saepe?
					</p>
				</AccordionItem>
			</Accordion>
		</ExerciseLayout>
	);
}
