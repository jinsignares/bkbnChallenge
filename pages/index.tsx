import { Delete, Edit } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EnhancedTable from '../components/Table'
import { fetchContacts } from '../redux/actions/contactsActions'
interface Data {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
  actions: Array<Function>,
}

function createData(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
  actions: []
): Data {
  return {
    firstName,
    lastName,
    email,
    phone,
    createdAt,
    updatedAt,
    actions
  };
}

const Home: NextPage = () => {
  const contacts = useSelector(state => state.contacts.results)
  const dispatch = useDispatch()

  const rows = useMemo(
    () => {
      if (contacts.length !== 0) {
        return contacts.map(({ id, firstName, lastName, phone, email, createdAt, updatedAt }) => {
          const actions = [
            () => (<IconButton>
              <Link href={`/${id}/update`}>
                <Edit />
              </Link>
            </IconButton>),
            () => (<IconButton>
              <Link href={`/${id}/delete`}>
                <Delete />
              </Link>
            </IconButton>)
          ]
          return createData(firstName, lastName, phone, email, createdAt, updatedAt, actions)
        })
      }
      else {
        return []
      }
    },
    [contacts],
  )

  useEffect(() => {
    if (contacts.length == 0) {
      dispatch(fetchContacts())
    }
  }, [dispatch, contacts])

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ width: '100%', height: '100%' }}
    >
      {rows.length > 0 && (
        <EnhancedTable rows={rows} />
      )}
    </Grid>
  )
}

export default Home