import { ArrowRightIcon, CloseIcon, ResetIcon } from '@/assets'
import {
  BottomSheetModal,
  Checkbox,
  Header,
  IconButton,
  List,
  ListItem,
  ListItemSeparator,
  SearchInput,
} from '@/components'
import { useVisibleRef } from '@/hooks'
import { BaseStyles, Colors } from '@/theme'
import { GetDebtsReq, Option } from '@/types'
import { convertViToEn } from '@/utils'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FilterTag } from '../tag'

type Value = Option<number>

type PartnersLineProps = {
  data: Value[]
  partnerIds: number[]
  onChange(value: Partial<GetDebtsReq>): void
}

export const PartnersLine = ({ data, partnerIds, onChange }: PartnersLineProps) => {
  const { ref, onOpen, onClose } = useVisibleRef()
  const partners = data?.filter((i) => partnerIds?.includes(i.value))

  return (
    <>
      <ListItem
        onPress={onOpen}
        style={BaseStyles.py16}
        right={<ArrowRightIcon size={20} fill={Colors.gray80} />}
        title={`Khách hàng${partnerIds?.length ? ` (${partnerIds.length})` : ''}`}
        subTitle={
          partners?.length && (
            <View style={styles.filterList}>
              {partners.map((item) => (
                <FilterTag
                  key={item.value}
                  label={item.label}
                  onPress={() => {
                    onChange({ partner_ids: partnerIds.filter((id) => id !== item.value) })
                  }}
                />
              ))}
            </View>
          )
        }
      />
      <BottomSheetModal ref={ref} showBottomSpacing={false}>
        <Header
          title="Chọn khách hàng"
          left={<IconButton icon={CloseIcon} size={24} color={Colors.gray80} onPress={onClose} />}
          right={
            <IconButton
              size={24}
              icon={ResetIcon}
              color={Colors.gray80}
              disabled={!partnerIds?.length}
              onPress={() => onChange({ partner_ids: [] })}
            />
          }
        />
        <PartnerList
          data={data}
          partnerIds={partnerIds}
          onChange={(item) => {
            const nextPartnerIds = partnerIds?.includes?.(item.value)
              ? partnerIds.filter((id) => id !== item.value)
              : [...(partnerIds || []), item.value]
            onChange({ partner_ids: nextPartnerIds })
          }}
        />
      </BottomSheetModal>
    </>
  )
}

const PartnerList = ({
  partnerIds,
  data,
  onChange,
}: Omit<PartnersLineProps, 'onChange'> & {
  onChange(value: Value): void
}) => {
  const [keyword, setKeyword] = useState('')

  const dataRender = useMemo(() => {
    const trimmedKeyword = keyword?.trim()

    if (!trimmedKeyword || !data?.length) {
      return data
    }

    return data.filter((item) => convertViToEn(item.label).includes(convertViToEn(keyword)))
  }, [data, keyword])

  return (
    <>
      <View style={[BaseStyles.px16, BaseStyles.py8]}>
        <SearchInput
          delay={0}
          value={keyword}
          onChange={setKeyword}
          showBarcodeScan={false}
          renderTextInput={(props) => <BottomSheetTextInput {...props} />}
        />
      </View>
      <List
        data={dataRender}
        provider="BottomSheetFlatList"
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          const isActive = partnerIds?.includes?.(item.value)
          return (
            <ListItem
              title={item.label}
              key={item.value}
              onPress={() => onChange(item)}
              left={<Checkbox size={20} type="checkbox" readOnly value={isActive} />}
            />
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  filterList: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
})

const Separator = () => <ListItemSeparator style={BaseStyles.pl16} />
