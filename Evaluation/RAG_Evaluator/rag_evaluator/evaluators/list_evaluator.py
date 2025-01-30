
from typing import List


def list_similarity_score(ground_truth_record_titles: List[str], predicted_record_titles: List[str]) -> float:
    """
    Calculate the Jaccard similarity score between two lists.
    
    Args:
    list1 (list): First list of items.
    list2 (list): Second list of items.
    
    Returns:
    float: Jaccard similarity score between 0 and 1.
    """
    set1 = set(ground_truth_record_titles)
    set2 = set(predicted_record_titles)
    
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    
    if not union:
        return 1.0  # Both lists are empty
    
    return len(intersection) / len(union)