import CreateSubmitButton from './create-submit-button'
import Item from '@/app/work/[id]/@directory/item'
import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import router from 'next/router'
export default async function List(props: { list: any[] }) {
  // 将list转换为树形数据根据数据中的parentId跟key相同则为其子节点
  props.list.forEach((item) => {
    item.title = <Item id={item.id} title={item.name} isCurrent={false} />
  })
  const treeData = props.list.reduce((pre, cur) => {
    if (cur.parentId == null) {
      pre.push(cur)
    } else {
      const parent = pre.find((item: { id: any }) => item.id === cur.parentId)
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(cur)
      }
    }
    return pre
  }, [] as any[])
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info)
    // 选中节点跳转
    if (selectedKeys.length > 0) {
      const selectedNode = treeData.find((node: { id: any }) => node.id === selectedKeys[0])
      console.log('selectedNode', selectedNode)
      // if (selectedNode) {
      //   router.push(`/work/${id}`)
      // }
    }
  }
  return (
    <Tree
      showIcon
      defaultExpandAll
      defaultSelectedKeys={['0-0-0']}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
    />
  )
}
