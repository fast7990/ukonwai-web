'use client'
import CreateSubmitButton from './create-submit-button'
import Item from '@/app/work/[id]/@directory/item'
import { Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import { DownOutlined, FrownFilled, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
export default async function List(props: { list: TreeDataNode[] }) {
  // 将list转换为树形数据根据数据中的parentId跟key相同则为其子节点

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];
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
