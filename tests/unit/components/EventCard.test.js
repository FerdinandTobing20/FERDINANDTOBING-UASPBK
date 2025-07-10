import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EventCard from '@/components/event/EventCard.vue'
import { formatters } from '@/utils/formatters'
import { ROLES } from '@/utils/constants'

describe('EventCard Component', () => {
  const mockEvent = {
    id: 1,
    title: 'Workshop Vue.js',
    description: 'Belajar Vue.js dari dasar hingga mahir',
    date: '2025-02-15',
    time: '09:00',
    location: 'Ruang Meeting A',
    capacity: 30,
    status: 'active'
  }

  function createWrapper(options = {}) {
    const user = options.user || { role: ROLES.ADMIN }

    return mount(EventCard, {
      props: {
        event: mockEvent,
        ...options.props
      },
      global: {
        plugins: [
          createTestingPinia({
  createSpy: vi.fn,
  initialState: {
    auth: {
      user: {
        role: options.user?.role || ROLES.PESERTA
      }
    }
  }
})

        ],
        stubs: {
          RouterLink: true
        }
      }
    })
  }

  describe('Rendering', () => {
    it('renders event information correctly', () => {
      const wrapper = createWrapper()

      expect(wrapper.text()).toContain(mockEvent.title)
      expect(wrapper.text()).toContain(mockEvent.description)
      expect(wrapper.text()).toContain(mockEvent.location)
      expect(wrapper.text()).toContain(`Kapasitas: ${mockEvent.capacity} peserta`)
    })

    it('displays formatted date and time', () => {
      const wrapper = createWrapper()
      const formattedDate = formatters.date(mockEvent.date)
      const formattedTime = formatters.time(mockEvent.time)

      expect(wrapper.text()).toContain(formattedDate)
      expect(wrapper.text()).toContain(formattedTime)
    })

    it('shows correct status badge', () => {
      const wrapper = createWrapper()
      const statusBadge = wrapper.find('.status-badge')

      expect(statusBadge.exists()).toBe(true)
      expect(statusBadge.classes()).toContain('active')
      expect(statusBadge.text()).toBe('Aktif')
    })
  })

  describe('User Interactions', () => {
    it('emits view event when "Lihat Detail" button is clicked', async () => {
      const wrapper = createWrapper()
      const viewButton = wrapper.find('.btn-view')

      expect(viewButton.exists()).toBe(true)
      await viewButton.trigger('click')

      expect(wrapper.emitted()).toHaveProperty('view')
      expect(wrapper.emitted('view')).toHaveLength(1)
      expect(wrapper.emitted('view')[0]).toEqual([mockEvent.id])
    })

    it('emits edit event when "Edit" button is clicked (admin only)', async () => {
      const wrapper = createWrapper({
        user: { role: ROLES.ADMIN }
      })

      const editButton = wrapper.find('.btn-edit')
      expect(editButton.exists()).toBe(true)
      await editButton.trigger('click')

      expect(wrapper.emitted()).toHaveProperty('edit')
      expect(wrapper.emitted('edit')).toHaveLength(1)
      expect(wrapper.emitted('edit')[0]).toEqual([mockEvent.id])
    })

    it('emits delete event when "Hapus" button is clicked (admin only)', async () => {
      const wrapper = createWrapper({
        user: { role: ROLES.ADMIN }
      })

      const deleteButton = wrapper.find('.btn-delete')
      expect(deleteButton.exists()).toBe(true)
      await deleteButton.trigger('click')

      expect(wrapper.emitted()).toHaveProperty('delete')
      expect(wrapper.emitted('delete')).toHaveLength(1)
      expect(wrapper.emitted('delete')[0]).toEqual([mockEvent.id])
    })
  })

  describe('Role-based Rendering', () => {
    it('shows edit and delete buttons for admin role', () => {
      const wrapper = createWrapper({
        user: { role: ROLES.ADMIN }
      })

      expect(wrapper.find('.btn-edit').exists()).toBe(true)
      expect(wrapper.find('.btn-delete').exists()).toBe(true)
    })

    it('hides edit and delete buttons for peserta role', () => {
      const wrapper = createWrapper({
        user: { role: ROLES.PESERTA }
      })

      expect(wrapper.find('.btn-edit').exists()).toBe(false)
      expect(wrapper.find('.btn-delete').exists()).toBe(false)
    })

    it('hides edit and delete buttons for panitia role', () => {
      const wrapper = createWrapper({
        user: { role: ROLES.PANITIA }
      })

      expect(wrapper.find('.btn-edit').exists()).toBe(false)
      expect(wrapper.find('.btn-delete').exists()).toBe(false)
    })
  })

  describe('Different Event Status', () => {
    it('displays inactive status correctly', () => {
      const inactiveEvent = { ...mockEvent, status: 'inactive' }
      const wrapper = createWrapper({
        props: { event: inactiveEvent }
      })

      const statusBadge = wrapper.find('.status-badge')
      expect(statusBadge.classes()).toContain('inactive')
      expect(statusBadge.text()).toBe('Tidak Aktif')
    })

    it('displays completed status correctly', () => {
      const completedEvent = { ...mockEvent, status: 'completed' }
      const wrapper = createWrapper({
        props: { event: completedEvent }
      })

      const statusBadge = wrapper.find('.status-badge')
      expect(statusBadge.classes()).toContain('completed')
      expect(statusBadge.text()).toBe('Selesai')
    })
  })
})
