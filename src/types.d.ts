import { Diet, Era, Kind } from "./enums";
import { ArticleAttributes } from "./models/Article";
import { SectionAttributes } from "./models/Section";

//Dinosaur
export interface CreateDinasaur {
 name: string,
 kind: Kind,
 era: Era,
 location: string,
 diet: Diet,
 url_image: string,
 url_render: string,
 article_id: ArticleAttributes['_id']
}
export interface UpdateDinosaur extends Partial<CreateDinasaur> {}

//Article
export interface CreateArticle {
  title: string
}
export interface UpdateArticle extends Partial<CreateArticle> {}

//Section
export interface CreateSection {
  title: string
  content: string
  article_id: ArticleAttributes['_id']
}
export interface UpdateSection extends Partial<CreateSection>{}

//Asset
export interface CreateAsset {
  url: string
  section_id: SectionAttributes['_id']
}
export interface UpdateAsset extends Partial<CreateAsset>{}