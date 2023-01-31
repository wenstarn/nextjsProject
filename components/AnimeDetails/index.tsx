import Image from 'next/image'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import styles from './AnimeDetails.module.scss'

interface Props {
  image: string
}

export default function AnimeDetails({ image }: Props) {
  return (
    <div className={styles.container}>
      <Image width={220} height={300} src={image} alt='anime image' />
      <Form.Select className={styles.select} aria-label='Default select example'>
        <option>Open this select menu</option>
        <option value='1'>One</option>
        <option value='2'>Two</option>
        <option value='3'>Three</option>
      </Form.Select>
      <div className={`${styles.info} text-light`}>
        <span>Эпизоды: 13/13</span>
        <ButtonGroup aria-label='Basic example'>
          <Button variant='danger'>-</Button>
          <Button variant='success'>+</Button>
        </ButtonGroup>
      </div>
      <div className={`${styles.info} text-light`}>
        <span>Оценка</span>
        <InputGroup className={styles.estimate}>
          <InputGroup.Text id='basic-addon1'><i className="bi bi-star-fill"></i></InputGroup.Text>
          <Form.Control
            placeholder='Username'
            aria-label='Username'
            aria-describedby='basic-addon1'
            type='number'
          />
        </InputGroup>
      </div>
    </div>
  )
}
