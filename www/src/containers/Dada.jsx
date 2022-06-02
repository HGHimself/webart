import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import * as dada from 'dada-poem-generator'

import FlexRow from '../components/FlexRow/'
import Title from '../components/Title/'


const defaultMessage = `TO MAKE A DADAIST POEM
Take a newspaper.
Take some scissors.
Choose from this paper an article of the length you want to make your poem.
Cut out the article.
Next carefully cut out each of the words that makes up this article and put them all in a bag.
Shake gently.
Next take out each cutting one after the other.
Copy conscientiously in the order in which they left the bag.
The poem will resemble you.
And there you are – an infinitely original author of charming sensibility, even though unappreciated by the vulgar herd.`

export default function Dada(props) {
    const [input, setInput] = useState(defaultMessage)

    const handleInput = ({ target }) => {
        setInput(target.value)
    }

    return (
        <>
            <div className="content">
                <FlexRow flex="flex">
                    <div
                        className={css`
                            width: 30%;
                        `}
                    >
                        <textarea onChange={handleInput} value={input} />
                    </div>
                    <div
                        className={css`
                            width: 60%;
                            margin-left: 40px;
                        `}
                    >
                        <pre>{dada.dada(input)}</pre>
                    </div>
                </FlexRow>
            </div>
            <Title
                title="DADA"
                description="Express your own irrationality! Enter words into the box on the left; see the output on the right."
            />
        </>
    )
}