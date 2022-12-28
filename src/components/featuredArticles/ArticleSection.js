import React, { useState } from 'react'
import ArticleCard from './ArticleCard.js'
import AddArticleButton from './AddArticleButton.js'

const ArticleSection = () => {

  const [isAddBtnActive, setIsAddBtnActive] = useState(true);
  const [articleCards, setArticleCards] = useState([
    <ArticleCard key={1}/>
  ])

  const addArticleCard = () => {
    if (articleCards.length < 3)
    {
      let articleCardsCopy = articleCards.slice();
      articleCardsCopy.push(<ArticleCard key={articleCards.length + 1} />);
      setArticleCards(articleCardsCopy);

      if (articleCards.length === 2) 
      {
        setIsAddBtnActive(false);
      }
    }
  }

  return (
    <div className='px-[2.5%] md:px-[5%] lg:px-[10%] xl:px-[15%]  py-12 bg-[#f2f2f2] flex justify-start gap-4 md:gap-8 lg:gap-12 max-w-full'>
        {articleCards.map(articleCard => articleCard)}
        <AddArticleButton  onClick={addArticleCard} isActive={isAddBtnActive}/>
    </div>
  )

}

export default ArticleSection