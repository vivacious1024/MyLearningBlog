# C++ 核心知识点：标准模板库 (STL) 全解

本文档详细总结了 C++ 中最重要的数据结构（STL 容器）及其常用接口。

## 1. 序列式容器 (Sequence Containers)

序列式容器维护元素的线性顺序。

### 1.1 `std::vector` (向量)

最常用的容器，内存连续，支持随机访问 $O(1)$，尾部插入/删除 $O(1)$。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| **Iterators** | | |
| `begin()`, `end()` | 返回指向首元素和尾后元素的迭代器 | $O(1)$ |
| `rbegin()`, `rend()` | 返回反向迭代器 | $O(1)$ |
| **Capacity** | | |
| `size()` | 返回元素个数 | $O(1)$ |
| `empty()` | 判断是否为空 | $O(1)$ |
| `resize(n)` | 改变大小，多退少补（默认补0或调用构造） | $O(N)$ |
| `capacity()` | 返回当前分配的存储空间大小 | $O(1)$ |
| `reserve(n)` | 预分配空间，避免频繁重新分配 | $O(N)$ |
| **Element Access** | | |
| `operator[]` | 下标访问，不检查边界 | $O(1)$ |
| `at(i)` | 下标访问，检查边界（抛出异常） | $O(1)$ |
| `front()` | 访问第一个元素 | $O(1)$ |
| `back()` | 访问最后一个元素 | $O(1)$ |
| **Modifiers** | | |
| `push_back(val)` | 尾部添加元素 | 均摊 $O(1)$ |
| `pop_back()` | 尾部移除元素 | $O(1)$ |
| `insert(pos, val)` | 在迭代器 pos 指定位置前插入 val | $O(N)$ |
| `erase(pos)` | 删除迭代器 pos 指定位置的元素 | $O(N)$ |
| `erase(first, last)` | 删除 [first, last) 区间的元素 | $O(N)$ |
| `clear()` | 清空所有元素 | $O(N)$ |
| `emplace_back(...)` | 原地构造元素（避免拷贝） | 均摊 $O(1)$ |

**元素查找：**

`vector` **不提供**类似 `map` 或 `set` 的 `find()` 成员函数。需要在 `<algorithm>` 头文件中使用 `std::find()` 全局函数。

- **调用方式**：`std::find(v.begin(), v.end(), val)`
- **返回值**：找到则返回指向该元素的迭代器；未找到则返回 `v.end()`。
- **复杂度**：$O(N)$ 线性查找。


**遍历方式：**

1. **范围 `for` 循环 (C++11 推荐)**：简洁直观。
   ```cpp
   for (const auto& val : v) cout << val << " ";
   ```
2. **迭代器遍历**：通用性强。
   ```cpp
   for (auto it = v.begin(); it != v.end(); ++it) {
       cout << *it << " ";
   }
   ```
3. **下标遍历**：类似原生数组。
   ```cpp
   for (size_t i = 0; i < v.size(); ++i) {
       cout << v[i] << " ";
   }
   ```

**代码示例：**

```cpp
#include <iostream>
#include <vector>
#include <algorithm> // 需包含此头文件

using namespace std;

int main() {
    vector<int> v;
    
    // 添加元素
    v.push_back(10);
    v.push_back(20);
    v.emplace_back(30); // 10, 20, 30
    
    // 插入元素
    v.insert(v.begin() + 1, 15); // 10, 15, 20, 30
    
    // 查找元素
    auto it = find(v.begin(), v.end(), 20);
    if (it != v.end()) {
        cout << "Found: " << *it << endl;
    } else {
        cout << "Not found" << endl;
    }

    // 访问
    cout << "Size: " << v.size() << endl; // 4
    cout << "Front: " << v.front() << ", Back: " << v.back() << endl; // 10, 30
    
    // 遍历
    for(int x : v) cout << x << " "; 
    cout << endl;
    
    // 删除
    v.pop_back(); // Remove 30
    v.erase(v.begin()); // Remove 10 -> 15, 20
    
    v.clear(); // Empty
    return 0;
}
```

### 1.2 `std::deque` (双端队列)

双端队列，元素在内存中不一定连续（分段连续），支持头部和尾部的高效插入/删除。

**特有接口（相比 vector）：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `push_front(val)` | 头部添加元素 | $O(1)$ |
| `pop_front()` | 头部移除元素 | $O(1)$ |
| `emplace_front(...)` | 头部原地构造 | $O(1)$ |

*注：deque 也支持 `[]` 随机访问，但速度比 vector 稍慢。*

**代码示例：**

```cpp
#include <deque>
#include <iostream>

using namespace std;

int main() {
    deque<int> d = {1, 2, 3};
    d.push_front(0); // 0, 1, 2, 3
    d.push_back(4);  // 0, 1, 2, 3, 4
    
    d.pop_front();   // 1, 2, 3, 4
    cout << d[1] << endl; // 2
    return 0;
}
```

### 1.3 `std::list` (双向链表)

双向链表，元素内存主要分散。不支持随机访问。支持任意位置 $O(1)$ 插入/删除（需已知迭代器）。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `push_front/back` | 头尾添加 | $O(1)$ |
| `pop_front/back` | 头尾移除 | $O(1)$ |
| `insert(pos, val)` | 在 pos 前插入 | $O(1)$ |
| `erase(pos)` | 删除 pos 处元素 | $O(1)$ |
| `remove(val)` | 删除所有等于 val 的元素 | $O(N)$ |
| `remove_if(pred)` | 删除满足条件的元素 | $O(N)$ |
| `unique()` | 删除连续重复元素 | $O(N)$ |
| `merge(list2)` | 合并两个有序链表 | $O(N)$ |
| `sort()` | 排序（这也是 list 成员函数，因为 std::sort 不支持）| $O(N \log N)$ |
| `reverse()` | 反转链表 | $O(N)$ |
| `splice(pos, list2)` | 将 list2 的元素剪接到 pos 前 | $O(1)$ |

**代码示例：**

```cpp
#include <list>
#include <iostream>

using namespace std;

int main() {
    list<int> l = {3, 1, 4, 1, 5};
    l.sort(); // 1, 1, 3, 4, 5
    l.unique(); // 1, 3, 4, 5 (删除相邻重复的 1)
    
    l.push_front(0); 
    // l[2] 是非法的, 必须通过迭代器访问
    auto it = l.begin();
    advance(it, 2); // 移动迭代器
    cout << *it << endl; 
    return 0;
}
```

---

## 2. 容器适配器 (Container Adapters)

底层封装了其他容器（如 deque, vector），提供特定的操作接口。

### 2.1 `std::stack` (栈)

后进先出 (LIFO)。默认底层为 deque。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `push(val)` | 入栈 | $O(1)$ |
| `pop()` | 出栈（不返回元素） | $O(1)$ |
| `top()` | 访问栈顶元素 | $O(1)$ |
| `empty()` | 判空 | $O(1)$ |
| `size()` | 大小 | $O(1)$ |

**代码示例：**

```cpp
#include <stack>
#include <iostream>
using namespace std;

int main() {
    stack<int> s;
    s.push(1);
    s.push(2);
    cout << s.top() << endl; // 2
    s.pop();
    cout << s.top() << endl; // 1
    return 0;
}
```

### 2.2 `std::queue` (队列)

先进先出 (FIFO)。默认底层为 deque。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `push(val)` | 入队（队尾） | $O(1)$ |
| `pop()` | 出队（队头，不返回元素） | $O(1)$ |
| `front()` | 访问队头 | $O(1)$ |
| `back()` | 访问队尾 | $O(1)$ |
| `empty()` | 判空 | $O(1)$ |
| `size()` | 大小 | $O(1)$ |

*注意：queue 没有 top()，只有 front()。*

**代码示例：**

```cpp
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(1);
    q.push(2); // 1, 2
    // q.front() is 1, q.back() is 2
    q.pop();   // Removes 1
}
```

### 2.3 `std::priority_queue` (优先队列)

堆 (Heap)。默认底层为 vector + 堆算法。默认是**最大堆**（大者在顶）。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `push(val)` | 入堆 | $O(\log N)$ |
| `pop()` | 删除堆顶 | $O(\log N)$ |
| `top()` | 访问堆顶 | $O(1)$ |
| `empty()` | 判空 | $O(1)$ |
| `size()` | 大小 | $O(1)$ |

**定义最小堆的小技巧：**
1. 存负数：`pq.push(-x)`，取出时 `-pq.top()`。
2. 指定比较器：`priority_queue<int, vector<int>, greater<int>> pq;`

**代码示例：**

```cpp
#include <queue>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 默认最大堆
    priority_queue<int> max_pq;
    max_pq.push(10);
    max_pq.push(30);
    max_pq.push(20);
    cout << max_pq.top() << endl; // 30
    
    // 最小堆
    priority_queue<int, vector<int>, greater<int>> min_pq;
    min_pq.push(10);
    min_pq.push(30);
    min_pq.push(20);
    cout << min_pq.top() << endl; // 10
    return 0;
}
```

---

## 3. 关联式容器 (Associative Containers)

底层通常使用**红黑树**实现。元素自动有序，查找效率 $O(\log N)$。

### 3.1 `std::set` (集合) & `std::multiset` (多重集合)

`set` 元素唯一，`multiset` 允许重复。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `insert(val)` | 插入元素 | $O(\log N)$ |
| `erase(val)` | 删除值为 val 的所有元素 | $O(\log N + k)$ |
| `erase(it)` | 删除迭代器指向的元素 | 均摊 $O(1)$ |
| `find(val)` | 查找 val，返回 iter，找不到返 end() | $O(\log N)$ |
| `count(val)` | 返回 val 的个数 (set只能是0或1) | $O(\log N)$ |
| `lower_bound(val)` | 返回首个 $\ge$ val 的迭代器 | $O(\log N)$ |
| `upper_bound(val)` | 返回首个 $>$ val 的迭代器 | $O(\log N)$ |

**代码示例：**

```cpp
#include <set>
#include <iostream>
using namespace std;

int main() {
    set<int> s;
    s.insert(10);
    s.insert(5);
    s.insert(10); // 重复插入无效
    
    if (s.count(5)) cout << "5 exists" << endl;
    
    auto it = s.find(10);
    if (it != s.end()) s.erase(it);
    
    // 遍历 (有序)
    for(auto x : s) cout << x << " "; // 5
    return 0;
}
```

### 3.2 `std::map` (映射) & `std::multimap`

存储键值对 `pair<const Key, T>`。按 Key 排序。

**常用接口：**

| 接口 | 描述 | 时间复杂度 |
| :--- | :--- | :--- |
| `insert({key, val})` | 插入 pair | $O(\log N)$ |
| `dest[key] = val` | 下标访问/插入 (仅 map)。若 key 不存在则默认构造插入 | $O(\log N)$ |
| `at(key)` | 安全访问，不存在抛异常 | $O(\log N)$ |
| `find(key)` | 查找 key | $O(\log N)$ |
| `erase(key)` | 删除 key | $O(\log N)$ |
| `count(key)` | 计数 | $O(\log N)$ |
| `lower_bound/upper_bound`| 同 set | $O(\log N)$ |

**代码示例：**

```cpp
#include <map>
#include <iostream>
#include <string>
using namespace std;

int main() {
    map<string, int> m;
    m["apple"] = 2; // 插入
    m["banana"] = 5;
    m["apple"] = 3; // 更新
    
    if (m.find("orange") == m.end()) {
        cout << "No orange" << endl;
    }
    
    for(auto& p : m) {
        cout << p.first << ": " << p.second << endl;
    }
    return 0;
}
```

---

## 4. 无序关联式容器 (Unordered Associative Containers)

底层使用**哈希表**实现。元素无序。查找、插入、删除平均时间复杂度 $O(1)$，最坏 $O(N)$。C++11 引入。

### 4.1 `std::unordered_set` / `std::unordered_map`

接口与 `set` / `map` 几乎一致，但**没有** `lower_bound` / `upper_bound`，也不支持范围遍历，迭代器是前向的。

**何时使用：**
- 不需要有序遍历。
- 对性能要求极高且数据量大。
- 需要自定义哈希函数（若 Key 不是基本类型）。

**代码示例：**

```cpp
#include <unordered_map>
#include <iostream>
using namespace std;

int main() {
    unordered_map<int, string> um;
    um[1] = "one";
    um[2] = "two";
    
    // 平均 O(1) 查找
    cout << um[1] << endl;
    return 0;
}
```

---

## 5. 字符串 (std::string)

虽然不是容器库的一部分，但用法极似 vector。

**常用接口：**

| 接口 | 描述 |
| :--- | :--- |
| `length()`, `size()` | 长度 |
| `empty()` | 判空 |
| `operator[]`, `at()` | 字符访问 |
| `push_back(char)` | 尾加字符 |
| `append(str)` / `+=` | 拼接字符串 |
| `substr(pos, len)` | 获取子串 (注意: 第二个参数是长度) |
| `find(substr)` | 查找子串位置，失败返 `string::npos` |
| `replace(pos, len, str)` | 替换 |
| `c_str()` | 返回 C 风格字符串 (`const char*`) |
| `stoi`, `stoll`, `to_string` | 数字/字符串转换 |

**代码示例：**

```cpp
#include <string>
#include <iostream>
using namespace std;

int main() {
    string s = "Hello";
    s += " World"; // Hello World
    
    if (s.find("World") != string::npos) {
        cout << "Found!" << endl;
    }
    
    string sub = s.substr(0, 5); // "Hello"
    return 0;
}
```

## 6. 其他常用工具

### `std::pair`

简单的二元组。
- 访问：`p.first`, `p.second`
- 构造：`make_pair(a, b)` 或 `{a, b}`

### `std::tuple` (C++11)

多元组。
- 访问：`get<0>(t)`, `get<1>(t)`...
- 构造：`make_tuple(...)`
- 解包：`tie(a, b, c) = t;`

### `std::bitset`

位图，用于高效率存储布尔值。
- `set()`, `reset()`, `flip()`
- `test(i)`: 检查第 i 位
- `count()`: 统计 1 的个数
- `to_string()`, `to_ulong()`

---
**总结：**
- 需要随机访问？用 `vector`。
- 需要头尾高效插入？用 `deque`。
- 需要大量中间插入删除？用 `list`。
- 需要去重/有序？用 `set`。
- 需要键值对映射？用 `map`。
- 需要极致查找速度且不在意顺序？用 `unordered_map`。
- 需要 LIFO? `stack`。FIFO? `queue`。最值? `priority_queue`。
