---
title: Topological Sort for problems using DAG
author: rhnvrm
type: post
date: 2016-08-06T00:00:00+00:00
url: blog/2016/08/06/topological-sort-for-problems-using-dag/
categories:
  - uncategorized

---
Given a DAG (Directed Acyclic Graph), in which we know the adjacencies represent the order in which to perform a task, and the
  
vertices are tasks, we want to place the vertices in a sequence. We must find a sequence that must satisfy
  
all dependencies of pre-requisites. This sequential arrangement of the vertices is called the topological sort of the DAG.

The first examples that come in my mind are of pre-requisite chains in courses offered at universities. Suppose, you were
  
given a challenge to plot a roadmap for everyone in your university about how they can complete their major and/or minor given
  
the courses they have already completed. Another one to which I was exposed recently was of finding out the complete sequence
  
of events that took place if only given a partial sequence and also to detect if the given information was accurate or not.

Accuracy of the given information can be detected by checking if at any point in the algorithm we detect a cycle. Since,
  
such problems are being expressed through DAGs, if there exists any cycle in the graph, it can be concluded that the graph will
  
not have a topological sort. The proof for this can be found [here][1]

Suppose we have the following graphs:

```python
graph1 = { "x" : ["y"],
                "z" : ["y"],
                "y" : [],
                "a" : ["b"],
                "b" : ["c"],
                "c" : [] }

Python

graph2 = {"x" : ["y"], "y": ["x"]}
```

Here, you can notice how <code class="highlighter-rouge">graph1</code> has a toposort but for <code class="highlighter-rouge">graph2</code>, it does not exist. This is because of the fact there
  
exists a cycle in the graph. We can also understand it using the proof of the statment I had mentioned above. “Topological
  
sort exists only for a DAG” and since graph2 is not a DAG (since, it is cyclic) it must not have a toposort.

We can find the toposort using a modified dfs algorithm or kahn’s algorithm.

[Kahn’s algorithm][2] is discussed in the link and depends and utilizes
  
on calculating the indegree of all the vertices and using Queue (although it can also be written using an array).

Here is my implementation using Modified DFS and an array as a (kind-of) stack:

```python
def dfs_toposort(graph):
    L = []
    color = { u : "white" for u in graph }
    found_cycle = [False]
    
    for u in graph:
        if color[u] == "white":
            dfs_visit(graph, u, color, L, found_cycle)
        if found_cycle[0]:
            break
    
    if found_cycle[0]:
        L = []
    
    L.reverse()
    return L

def dfs_visit(graph, u, color, L, found_cycle):
    if found_cycle[0]:
        return
    color[u] = "gray"
    
    for v in graph[u]:
        if color[v] == "gray":
            found_cycle[0] = True
            return
        if color[v] == "white":
            dfs_visit(graph, v, color, L, found_cycle)
    
    color[u] = "black"
    L.append(u)
```

The function <code class="highlighter-rouge">dfs_toposort</code> returns an empty array if there exists a cycle in the graph.

Also, it is important to note here that the topological sort need not be unique. (Hence, for competitive programming
  
problems it might be easier to find problems that involve checking if a given graph is a DAG or not; or if a sequence
  
satisfying the pre-req chain exists or not by detecting cycles). This is quite evident once you realize that there might
  
be many 0-in-degree vertices that can lead the toposort result.

You can also see [Erik Demaine’s][3] lecture on this topic given for MIT 6.006

 [1]: https://ece.uwaterloo.ca/~cmoreno/ece250/2012-03-16--topological-sort.pdf
 [2]: http://www.geeksforgeeks.org/topological-sorting-indegree-based-solution/
 [3]: https://www.youtube.com/watch?v=AfSk24UTFS8