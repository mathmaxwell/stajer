
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../elements/setHomePage'
import useLang from '../lang/lang'
import { langRu, langUz } from '../lang/language'
import employees from '../employees/employees'
import type { IEmployees } from '../types/types'
import MyPieChart from '../elements/MyPieChart'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
} from '@mui/material'

const CheckEmotion = () => {
  const [array, setArray] = useState<IEmployees[]>([])
  const [emotions, setEmotions] = useState<Record<string, number>>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const { setPage } = useStore()
  const navigate = useNavigate()
  const { lang } = useLang()

  useEffect(() => {
    const fetch = async () => {
      const data = (await employees) || []
      setArray(data)
      const moodStats: Record<string, number> = {}
      data.forEach((user: IEmployees) => {
        if (user.mood) {
          moodStats[user.mood] = (moodStats[user.mood] || 0) + 1
        }
      })
      setEmotions(moodStats)
    }

    fetch()
  }, [])

  const handleSegmentClick = (emotion: string) => {
    setSelectedEmotion(emotion)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setSelectedEmotion(null)
  }

  const emotionDetails = useMemo(() => {
    if (!selectedEmotion) return []
    return array
      .filter(user => user.mood === selectedEmotion)
      .map(user => ({
        name: user.fullName || `Сотрудник ${user.id || 'N/A'}`,
      }))
  }, [selectedEmotion, array])

  const currentLang = lang === 'uz' ? langUz : langRu

  return (
    <Box sx={{ display: 'flex', gap: 3, width: '100%', p: 0 }}>
      <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant='h6' fontWeight={500}>
            {currentLang.employeesMood}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mt: 2,
            }}
          >
            <Box>
              <MyPieChart dataObject={emotions} onSegmentClick={handleSegmentClick} />
            </Box>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                navigate('base/all-mood')
                setPage('base')
              }}
            >
              {currentLang.viewAll}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Typography variant='h6' fontWeight={500} sx={{ mb: 2 }}>
            {currentLang.birthdays}
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            {array.slice(0, 5).map((user, id) => (
              <Box key={id}>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 0,
                  }}
                >
                  <ListItemText primary={user.fullName} />
                  <Typography variant='body2'>{user.birthday}</Typography>
                </ListItem>
                {id < 4 && <Divider sx={{ bgcolor: 'grey.400' }} />}
              </Box>
            ))}
          </List>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              navigate('/base/all-birthday')
              setPage('base')
            }}
            sx={{ mt: 2, alignSelf: 'center' }}
          >
            {currentLang.viewAll}
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby='modal-title'
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography id='modal-title' variant='h6' component='h2' mb={2}>
            {currentLang.employeesMood} {selectedEmotion && (
              selectedEmotion === '1'
                ? '😭'
                : selectedEmotion === '2'
                ? '😡'
                : selectedEmotion === '3'
                ? '😢'
                : '😂'
            )}
          </Typography>
          <List>
            {emotionDetails.length > 0 ? (
              emotionDetails.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))
            ) : (
              <Typography>{currentLang.noLatenessData || 'Нет данных'}</Typography>
            )}
          </List>
        </Box>
      </Modal>
    </Box>
  )
}

export default CheckEmotion